import "./table.css";

const Table = ({ data, column,navigate,deleteMember }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item}/>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow item={item} column={column} deleteMember={deleteMember} navigate={navigate}/>
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column,navigate ,deleteMember}) => (
  
  <tr>
    {column.map((columnItem, index) => {

      console.log(columnItem.value);
      if (
        columnItem.value === "entranceDate" ||
        columnItem.value === "birthdate"
      )
        return (
          <td key={index}>
            {new Date(item[columnItem.value]).toLocaleDateString("en-CA")}
          </td>
        );
      else if (columnItem.value === "btns") {
        return (
          <td style={{ flexDirection: "row", display: "flex" }}>
            <button
              onClick={() => {
                navigate(`/editmembers`, {state:{ user: item  }});
              }}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: 5,
                borderRadius: 10,
                marginRight: 5,
                marginTop:8
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                deleteMember(item.email);
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: 5,
                marginTop:8,

                borderRadius: 10,
              }}
            >
              delete
            </button>
          </td>
        );
      }
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
