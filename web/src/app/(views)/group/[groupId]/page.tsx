import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ShareIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Gallery } from "@/components/image-gallery";
import { Group, Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { mockGroups } from "@/mocks/data";

// Mock API function to fetch group data
const fetchGroupData = async (groupId: string) => {
  // Find the group with matching ID
  const group = mockGroups.find((group) => group.id === groupId);

  // Simulate API behavior - throw error if not found
  if (!group) {
    throw new Error("Group not found");
  }

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Type assertion to ensure the mock data conforms to the Group type
  return { data: group as unknown as Group };
};

// Generate static params for SSG
export async function generateStaticParams() {
  return mockGroups.map((group) => ({
    groupId: group.id,
  }));
}

// Group Details Component
const GroupDetails = ({ group }: { group: Group }) => (
  <div className="space-y-4">
    <div className="flex items-start gap-2">
      <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
      <div className="flex flex-col">
        <span className="font-semibold">{group.location}</span>
      </div>
    </div>
    <div className="flex items-start gap-2">
      <UsersIcon className="h-5 w-5 text-muted-foreground mt-1" />
      <div className="flex flex-col">
        <span className="font-semibold">{group.memberCount} members</span>
      </div>
    </div>
  </div>
);

// Hosts Section Component
const HostsSection = ({ group }: { group: Group }) => (
  <div className="flex flex-col gap-1">
    <span className="text-semibold text-foreground">Hosts</span>
    <div className="flex gap-2 mt-2">
      {group.hosts.map((host) => (
        <Avatar key={host.id} title={host.displayName}>
          {host.displayPicture ? (
            <AvatarImage src={host.displayPicture.src} alt={host.displayName} />
          ) : (
            <AvatarFallback>
              {host.displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      ))}
    </div>
  </div>
);

// Members List Component
const MembersList = ({ members }: { members: Group["members"] }) => (
  <div>
    <span className="text-semibold text-foreground mb-2 block">
      Members ({members.length})
    </span>
    <div className="flex flex-wrap gap-2">
      {members.slice(0, 8).map((member) => (
        <Avatar key={member.id} title={member.displayName}>
          {member.displayPicture ? (
            <AvatarImage
              src={member.displayPicture.src}
              alt={member.displayName}
            />
          ) : (
            <AvatarFallback>
              {member.displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      ))}
      {members.length > 8 && (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
          <span className="text-xs">+{members.length - 8}</span>
        </div>
      )}
    </div>
  </div>
);

// Events Section Component
const EventsSection = ({ events }: { events: Group["events"] }) => (
  <section className="mb-8" aria-labelledby="events-heading">
    <h2 id="events-heading" className="text-2xl font-semibold mb-4">
      Upcoming Events
    </h2>
    {events.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img
                src={
                  event.bannerImage?.src ||
                  "https://picsum.photos/id/34/400/400"
                }
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {!event.timing.tbd
                    ? new Date(event.timing.startDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "Date TBD"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-muted-foreground">No upcoming events</p>
    )}
  </section>
);

// Sticky Actions Component
const StickyActions = ({ group }: { group: Group }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-40">
    <div className="mx-auto max-w-4xl flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">
          {group.memberCount} members
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Share group">
            <ShareIcon className="h-4 w-4" />
          </Button>
          <Link href="/group/create" passHref>
            <Button variant="outline" size="sm" className="gap-1">
              Create Group
            </Button>
          </Link>
        </div>
      </div>
      <Button size="lg" className="w-40" aria-label="Join group">
        Join Group
      </Button>
    </div>
  </div>
);

// Main Group Page Component
const GroupPage = async ({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) => {
  const groupId = (await params).groupId;

  try {
    // Fetch group data using our mock API function
    const { data: group }: { data: Group } = await fetchGroupData(groupId);

    return (
      <div className="pb-20">
        {/* Banner and Title */}
        <section className="h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src={
              group.coverPicture?.src || "https://picsum.photos/id/34/400/400"
            }
            alt="Group banner"
            className="object-cover w-full h-full"
          />
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                {group.name}
              </h1>
              {/* TAG SECTION */}
              <div className="flex gap-2 mt-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm"
                  >
                    {tag.value}
                  </span>
                ))}
              </div>
            </div>
            <Link href={`/group/${group.id}/edit`} passHref>
              <Button variant="outline" size="sm" className="gap-1">
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        </section>
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Group Details */}
            <Card>
              <CardContent className="p-6">
                <GroupDetails group={group} />
              </CardContent>
            </Card>
            {/* Host Details */}
            <Card>
              <CardContent className="p-6">
                <HostsSection group={group} />
              </CardContent>
            </Card>
            {/* Members Details */}
            <Card>
              <CardContent className="p-6">
                <MembersList members={group.members} />
              </CardContent>
            </Card>
          </div>
          {/* About Section */}
          <section
            className="mb-8 md:max-w-2xl"
            aria-labelledby="about-heading"
          >
            <h2 id="about-heading" className="text-2xl font-semibold mb-4">
              About
            </h2>
            <p className="text-foreground">{group.bio?.text}</p>
          </section>
        </div>

        {/* Events Section */}
        <EventsSection events={group.events} />

        {/* Gallery Section */}
        {group.photos.length > 0 && (
          <section className="mb-8" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
              Gallery
            </h2>
            <Gallery images={group.photos} />
          </section>
        )}

        {/* Discussion Section */}
        {group.discussion.length > 0 && (
          <section className="mb-8" aria-labelledby="discussion-heading">
            <h2 id="discussion-heading" className="text-2xl font-semibold mb-4">
              Discussion
            </h2>
            <div className="space-y-4">
              {group.discussion.map((comment: any) => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{comment.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p>{comment.commentData.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sticky Actions */}
        <StickyActions group={group} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Error Loading Group</h1>
        <p>We couldn't load this group. Please try again later.</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }
};

export default GroupPage;
