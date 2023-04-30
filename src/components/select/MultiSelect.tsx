import { SetState } from "@/types/sharedTypes";
import React from "react";
import { MultiSelect, Option } from "react-multi-select-component";

export type MultiSelectOption = {
    label: string;
    value: string;
}

export type MultiSelectProps = {
    options: Option[];
    selected: Option[];
    setSelected: SetState<Option[]>;
}

const MultipleSelect = ({ options, selected, setSelected }: MultiSelectProps) => {

    return (
        <div>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
                options={options}
                hasSelectAll={true}
                isLoading={false}
                shouldToggleOnHover={false}
                disableSearch={false}
                value={selected}
                disabled={false}
                onChange={setSelected}
                onMenuToggle={(s: string) => {
                    console.debug("Select Toggle: ", s);
                }}
                labelledBy={"Select Destinations"}
                className={"multi-select"}
            />
        </div>
    );
};

export default MultipleSelect;