import { COMMANDS } from "@/constant/SlashMenu";
export const SlashMenu = ({
  executeCommand,
  query,
}: {
  executeCommand: (command: (typeof COMMANDS)[0]) => void;
  query: string;
}) => {
  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="max-h-64 overflow-y-auto dark:bg-black">
      {filteredCommands.length > 0 ? (
        filteredCommands.map((command, index) => (
          <div
            key={index}
            className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            onClick={() => 
             { console.log("clicked");executeCommand(command)}}
          >
            <div className="flex justify-start items-center gap-4">
              <command.icon className="bg-blue-100 px-2 py-1 flex items-center justify-center text-primary font-semibold h-8 w-8 border rounded-sm dark:text-white dark:bg-black " />
              <div className="font-medium dark:text-white">{command.name}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-3 py-2 text-gray-400 text-sm">
          No commands found for "{query}"
        </div>
      )}
    </div>
  );
};
