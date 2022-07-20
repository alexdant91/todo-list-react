const TableComponent = ({ todos, isLoaded, handleRemoveTodo, handleUpdateTodo }) => {
  return (
    <>
      <div>
        {
          !isLoaded ?
            <p>Loading...</p>
            :
            todos.length > 0 ?
              (
                <table>
                  <thead>
                    <tr>
                      {
                        Object.keys(todos[0]).map((key, idx) => {
                          return (
                            <th key={`tr-th-${idx}`}>{key}</th>
                          )
                        })
                      }
                      <th>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      todos.map(todo => {
                        return (
                          <tr key={`tr-${todo.id}`}>
                            {
                              Object.keys(todo).map((key, ind) => {
                                return (
                                  <td key={`tr-td-${ind}`}>{todo[key].toString()}</td>
                                )
                              })
                            }
                            <td>
                              <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                            </td>
                            <td>
                              <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
              :
              (
                <div>Errore nella richiesta al server</div>
              )
        }
      </div>
    </>
  )
}

export default TableComponent;
