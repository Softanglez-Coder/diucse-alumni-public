import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export enum LinkGroup {
  SocialMedia = "Social Media",
  GetHelp = "Get Help",
  AboutThisSite = "About This Site",
}

interface NavLink {
  to: string;
  label: string;
  group: LinkGroup;
}

export const QuickLinks = () => {
  const [groupedLinks, setGroupLinks] = useState<Record<LinkGroup, Array<NavLink>>>({
    [LinkGroup.SocialMedia]: [],
    [LinkGroup.GetHelp]: [],
    [LinkGroup.AboutThisSite]: [],
  });
  
  useEffect(() => {
    fetch("/data/quick-links.json")
      .then((res) => res.json())
      .then((data) => {
        const links: Array<NavLink> = data.map((item: any) => ({
          to: item.to,
          label: item.label,
          group: item.group as LinkGroup,
        }));

        setGroupLinks(links.reduce((acc, link) => {
          if (!acc[link.group]) {
            acc[link.group] = [];
          }
          acc[link.group].push(link);
          return acc;
        }, {} as Record<LinkGroup, Array<NavLink>>));
      })
      .catch(() => {
        console.error("Failed to load quick links");
        setGroupLinks({
          [LinkGroup.SocialMedia]: [],
          [LinkGroup.GetHelp]: [],
          [LinkGroup.AboutThisSite]: [],
        });
      });
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-8 py-16">
        {Object.keys(groupedLinks).map((group) => (
          <div key={group} className="flex flex-col">
            <h3 className="mb-4 text-lg font-bold border-b border-b-gray-300">
              {group}
            </h3>
            <ul className="uppercase text-sm flex flex-col gap-2">
              {groupedLinks[group as LinkGroup].map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
