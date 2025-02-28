import Link from "next/link";

type Group = {
  id: number;
  title: string;
};

export async function generateStaticParams() {
  const groups: Group[] = await fetch(
    "http://localhost:3000/api/groups/all"
  ).then((res) => res.json());
  return groups.map((group) => ({
    id: String(group.id),
  }));
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const id = (await params).groupId;
  const response = await fetch(`http://localhost:3000/api/groups/${id}`);
  const json: Group = await response.json();

  return (
    <div>
      <h1>Group Page : {json.title}</h1>
      <Link href={"/group/1"}>___1</Link>
      <Link href={"/group/2"}>___2</Link>
      <Link href={"/group/3"}>___3</Link>
    </div>
  );
}
