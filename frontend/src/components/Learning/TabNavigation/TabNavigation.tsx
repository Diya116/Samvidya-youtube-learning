import React from "react";
import { BookOpen, Notebook, Info } from "lucide-react";
import TabButton from "./TabButton";

type TabType = "details" | "lessons" | "notes";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  variant?: "mobile" | "desktop";
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  variant = "desktop",
}) => {
  const tabs = [
    { key: "details" as const, icon: Info, label: "Details", title: "Course Details" },
    { key: "lessons" as const, icon: BookOpen, label: "Lessons", title: "Lessons" },
    { key: "notes" as const, icon: Notebook, label: "Notes", title: "Notes" },
  ];

  if (variant === "mobile") {
    return (
      <div className="border-b bg-card flex-shrink-0">
        <div className="flex">
          {tabs.map(({ key, icon, label }) => (
            <TabButton
              key={key}
              icon={icon}
              label={label}
              isActive={activeTab === key}
              onClick={() => onTabChange(key)}
              variant="mobile"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-16 bg-gray-50 dark:bg-gray-800 border-r flex flex-col items-center py-4 space-y-4">
      {tabs.map(({ key, icon, label, title }) => (
        <TabButton
          key={key}
          icon={icon}
          label={label}
          title={title}
          isActive={activeTab === key}
          onClick={() => onTabChange(key)}
          variant="desktop"
        />
      ))}
    </div>
  );
};

export default TabNavigation;