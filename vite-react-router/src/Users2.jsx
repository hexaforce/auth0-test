import { useApi } from "./use-api";
import { Loading, Error } from "./Components";

import { ALL_USERS_QUERY, CREATE_USER_MUTATION } from './User'
import { useMutation, useQuery } from '@apollo/client'

const PORT = import.meta.env.VITE_API_PORT || 3001;

function DisplayUsers() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return data?.allUsers.map(({ id, email, registered_at }) => (
    <div key={id}>
      <p>Email: {email}</p>
      <p>Registered At: {registered_at}</p>
    </div>
  ))
}

function CreateUserComponent() {
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const handleCreateUser = () => {
    const options = {
      variables: {
        user: {
          email: 'example@example.com',
          password: 'password123',
        },
      },
    }
    createUser(options)
      .then((response) => console.log('response:', response.data))
      .catch((error) => console.log('error:', error))
  }
  return <button onClick={handleCreateUser}>Create User</button>
}

export function Users2() {

  
  // const {
  //   loading,
  //   error,
  //   data: users = [],
  // } = useApi(`http://localhost:${PORT}/users`, {
  //   audience: import.meta.env.VITE_AUDIENCE,
  //   scope: "profile email read:users",
  // });

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <Error message={error.message} />;
  // }

  return (
     <DisplayUsers />
  );
}
