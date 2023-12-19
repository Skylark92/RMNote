export default function ListItem({ name }: { name: string }) {
  if (!name) return null;

  return (
    <li className="w-full py-1 px-6 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer">
      <div className={`inline-block w-6 h-8 bg-red-300 min-w-[1.5rem]`}></div>
      <h3 className="inline-block">{name}</h3>
    </li>
  );
}
