import { Courosal } from "./Components/Courosal";
import { ExploreTopBooks } from "./Components/ExploreTopBooks";
import { Heros } from "./Components/Heros";
import { LibraryServices } from "./Components/LibraryServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Courosal />
            <Heros />
            <LibraryServices />
        </>
    );
}