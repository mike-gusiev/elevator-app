import { useSelector } from "react-redux";

import { useAppDispatch } from "../shared";
import { PersonTabs } from "../components";
import { selectPersonInfo, addPerson, changeCurrentPerson, removePerson } from "../store";

export const PersonTabsContainer = () => {
    const dispatch = useAppDispatch();

    const info = useSelector(selectPersonInfo);

    const handleOnClickAdd = () => {
        const lastId = info.all[info.all.length - 1].id;
        dispatch(addPerson({ id: lastId + 1 }));
    };

    const handleOnExecuteAction = (action: "change" | "remove") => (id: number) => {
        if (action === "change") dispatch(changeCurrentPerson({ id }));

        if (action === "remove") dispatch(removePerson({ id }));
    };

    return (
        <PersonTabs
            data={info.all}
            currentPersonId={info.currentPersonId}
            onClickAdd={handleOnClickAdd}
            onSelectPerson={handleOnExecuteAction("change")}
            onRemovePerson={handleOnExecuteAction("remove")}
        />
    );
};
