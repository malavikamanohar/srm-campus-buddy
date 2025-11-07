import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Building2, GraduationCap, User } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { buildings } from "@/data/buildings";
import { departments } from "@/data/faculties";
import { facultyMembers } from "@/data/facultyMembers";

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (value: string) => {
    setOpen(false);
    navigate(value);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search buildings, departments, faculty...</span>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search buildings, departments, faculty..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Buildings">
            {buildings.map((building) => (
              <CommandItem
                key={building.id}
                value={`${building.name} ${building.campus} ${building.category}`}
                onSelect={() => handleSelect(`/buildings/${building.id}`)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{building.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {building.campus} • {building.category}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Departments">
            {departments.map((dept) => (
              <CommandItem
                key={dept.id}
                value={`${dept.name} ${dept.location} ${dept.programs.join(" ")}`}
                onSelect={() => handleSelect(`/faculties/department/${dept.id}`)}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{dept.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {dept.location}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Faculty Members">
            {facultyMembers.map((faculty) => (
              <CommandItem
                key={faculty.id}
                value={`${faculty.name} ${faculty.designation} ${faculty.researchAreas.join(" ")}`}
                onSelect={() => handleSelect(`/faculties/member/${faculty.id}`)}
              >
                <User className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{faculty.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {faculty.designation} • {faculty.researchAreas[0]}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
