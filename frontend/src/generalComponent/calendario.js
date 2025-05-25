import DatePicker from "react-multi-date-picker";

const Calendario = ({ fechas, setFechas }) => {
  return (
    <div>
      <DatePicker
        multiple
        value={fechas}
        onChange={setFechas}
        format="YYYY-MM-DD"
        placeholder="Selecciona fechas"
      />
    </div>
  );
};

export default Calendario;
