import Link from "next/link";
import { CreateEventButton } from "@/components/create-event-button";

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

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Group: {json.title}</h1>
        <CreateEventButton groupId={"e9cbd152-ef0c-47c7-81e4-adb11168f856"} />
      </div>

      <div className="flex gap-4 mb-8">
        <Link href={"/group/1"} className="underline">
          Group 1
        </Link>
        <Link href={"/group/2"} className="underline">
          Group 2
        </Link>
        <Link href={"/group/3"} className="underline">
          Group 3
        </Link>
      </div>

      <div className="bg-muted/40 p-8 rounded-lg text-center">
        <p className="text-muted-foreground">No events in this group yet.</p>
        <p className="text-muted-foreground">
          Create a new event to get started!
        </p>
      </div>
    </div>
  );
}
