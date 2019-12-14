// sets the header within token as x-access-token which is defined in servers
export const headerSetter = (token) => (
    {
      headers: {
        'x-access-token': token
      }
    }
  )