import { useApi } from "./use-api";
import { Loading, Error } from "./Components";

const PORT = import.meta.env.VITE_API_PORT || 3001;

export function Users() {
  const {
    loading,
    error,
    data: users = [],
  } = useApi(`http://localhost:${PORT}/users`, {
    audience: import.meta.env.VITE_AUDIENCE,
    scope: "profile email read:users",
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(
          ({ name, email }, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
