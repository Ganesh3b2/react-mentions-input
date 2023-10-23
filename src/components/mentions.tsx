import React from "react";

interface IDataTypes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

const MentionsInput = ({
  data,
  onChange,
}: {
  data: IDataTypes[];
  onChange: (evt: any) => void;
}): JSX.Element => {
  const [mentionEnabled, setMentionEnabled] = React.useState<boolean>(false);
  const [inputText, setInputText] = React.useState<string>("");

  //belows states to handle jsonData
  const [filteredData, setFilteredData] = React.useState<IDataTypes[]>([]);
  const [filterText, setFilterText] = React.useState<string>("");

  //handle change function for input field
  const handleInputChange = (value: string) => {
    setInputText(value);
    // checking last character of user input
    const lastChar = value.split("")[value.length - 1];

    // disable mentions & data filter when last char is not '@'
    if (lastChar === " " || inputText === "") {
      setMentionEnabled(false);
      setFilteredData([]);
    }

    // enable mention dropdown when lastchar is "@"
    if (lastChar === "@") {
      setMentionEnabled(true);
    }

    // get string after "@" to filter data
    if (mentionEnabled) {
      const words = value.split(" ");
      let text = words[words.length - 1].substring(1);
      setFilterText(text);
    }
  };

  //   filter function
  const filterDataBasedOnText = () => {
    let filterData = [];
    if (filterText.length > 0) {
      filterData = data.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredData(filterData);
    }
  };

  //  assign selected data string to inputText value
  const onItemSelect = (item: string) => {
    setFilteredData([]);
    let final_text =
      inputText.substring(0, inputText.length - filterText.length) + item;
    onChange(final_text);
    setInputText(final_text);
  };

  //   trigger filterfunction after sometime to reduce continous renders
  React.useEffect(() => {
    const debounceFun = setTimeout(() => {
      filterDataBasedOnText();
    }, 500);

    return () => clearTimeout(debounceFun);
  }, [filterText]);

  return (
    <div>
      <input
        className="resize-x rounded-md"
        size={90}
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e.target.value);
          onChange(inputText);
        }}
      ></input>
      {mentionEnabled && (
        <div className="shadow h-auto w-56 absolute">
          <ul className="text-left">
            {filteredData.map((item, i) => (
              <li
                key={i}
                className="p-3 border text-gray-700 hover:text-white hover:bg-indigo-700 cursor-pointer"
                onClick={() => {
                  onItemSelect(item.first_name + " " + item.last_name);
                }}
              >
                {item.first_name + " " + item.last_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentionsInput;
