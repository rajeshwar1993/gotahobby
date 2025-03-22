import Link from "next/link";

type Group = {
  id: number;
  title: string;
};

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const id = (await params).groupId;
  const response = await fetch(`http://localhost:3000/api/groups/${id}`);
  const json: Group = await response.json();

  return <div className="container py-8"></div>;
}
