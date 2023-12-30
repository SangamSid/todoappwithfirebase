export default function Input({ handleEditOrAdd, ival }) {
  return (
    <input
      ref={ival}
      type="text"
      required
      name="title"
      onChange={handleEditOrAdd}
      className="p-2 mt-1 border rounded text-black block w-full focus:outline-none"
    />
  );
}
