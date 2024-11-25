import { createContext } from "react";
import { RoomProvider } from "./RoomDetailsContext"
import { SearchProvider } from "./SearchContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  return (
    <RoomProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </RoomProvider>
  );
};

export default AppContext;
