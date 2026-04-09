"use client"
import { Portal } from "@ark-ui/react/portal";
import { Select, createListCollection } from "@ark-ui/react/select";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { TiWorld } from "react-icons/ti";
import { BsLock } from "react-icons/bs";

interface Theme {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function VisibilityEdit() {
  const [selectedTheme, setSelectedTheme] = useState<string>("public");

  const themes: Theme[] = [
    { label: "Public", value: "public", icon: TiWorld },
    { label: "Private", value: "private", icon: BsLock }, 
  ];

  const collection = createListCollection<Theme>({ items: themes });

  const selectedThemeData = themes.find(
    (theme) => theme.value === selectedTheme
  );
  const ThemeIcon = selectedThemeData?.icon || TiWorld;

  return (
    <div className="  w-full  rounded-xl flex items-center ">
      <div className="max-w-sm w-full">
        <Select.Root
          collection={collection}
          defaultValue={["public"]}
          onValueChange={(e) => setSelectedTheme(e.value[0] || "public")}
        > 
          <Select.Control>
            <Select.Trigger className="flex h-10 w-fit bg-brand px-4 items-center justify-between rounded-lg border border-gray-300  ">
              <div className="flex items-center gap-2">
                <ThemeIcon className="h-4 w-4  " />
                <Select.ValueText placeholder="Select a theme" />
              </div>
              <Select.Indicator>
                <ChevronDownIcon className="h-4 w-4 ml-2 " />
              </Select.Indicator>
            </Select.Trigger> 
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content className="z-50 min-w-(--reference-width) bg-secondary rounded-md shadow-lg border border-white/40 p-2 text-white  ">
                <Select.ItemGroup> 
                  {collection.items.map((theme) => (
                    <Select.Item
                      key={theme.value}
                      item={theme}
                      className="relative flex items-center cursor-pointer px-3 py-1.5 pr-10  "
                    >
                      <theme.icon className="mr-3 h-4 w-4 text-white  " />
                      <Select.ItemText>{theme.label}</Select.ItemText>
                      <Select.ItemIndicator className="absolute right-3 text-white">
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </div>
    </div>
  );
}
