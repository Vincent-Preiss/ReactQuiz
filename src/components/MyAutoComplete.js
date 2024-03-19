import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

function MyAutoComplete() {
  /*
  Simple Example
  const initialArray = ["Brokkoli", "Zucchini", "Karotte"];
  const [name, setName] = useState("");
  const items = initialArray;
  const [filteredItems, setFilteredItems] = useState(initialArray);
  function search(e) {
    let _filteredItems;
    if (!e.query.trim().length) {
      _filteredItems = [...items];
    } else
      _filteredItems = items.filter((item) => {
        return item.toLowerCase().startsWith(e.query.toLowerCase());
      });
    setFilteredItems(_filteredItems);
  }

  return (
    <AutoComplete
      value={name}
      suggestions={filteredItems}
      completeMethod={search}
      onChange={(e) => {
        setName(e.target.value);
      }}
      dropdown={true}
      multiple={true}
    ></AutoComplete>
  );*/

  /* More advanced example */
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);
  const groupedCities = [
    {
      label: "Germany",
      code: "DE",
      items: [
        { label: "Berlin", value: "Berlin" },
        { label: "Frankfurt", value: "Frankfurt" },
        { label: "Hamburg", value: "Hamburg" },
        { label: "Munich", value: "Munich" },
      ],
    },
    {
      label: "USA",
      code: "US",
      items: [
        { label: "Chicago", value: "Chicago" },
        { label: "Los Angeles", value: "Los Angeles" },
        { label: "New York", value: "New York" },
        { label: "San Francisco", value: "San Francisco" },
      ],
    },
    {
      label: "Japan",
      code: "JP",
      items: [
        { label: "Kyoto", value: "Kyoto" },
        { label: "Osaka", value: "Osaka" },
        { label: "Tokyo", value: "Tokyo" },
        { label: "Yokohama", value: "Yokohama" },
      ],
    },
  ];

  const groupedItemTemplate = (item) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={item.label}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${item.code.toLowerCase()} mr-2`}
          style={{ width: "18px" }}
        />
        <div>{item.label}</div>
      </div>
    );
  };

  const search = (event) => {
    let query = event.query;
    let _filteredCities = [];

    for (let country of groupedCities) {
      let filteredItems = country.items.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );

      if (filteredItems && filteredItems.length) {
        _filteredCities.push({ ...country, ...{ items: filteredItems } });
      }
    }

    setFilteredCities(_filteredCities);
  };

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        suggestions={filteredCities}
        completeMethod={search}
        field="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        optionGroupTemplate={groupedItemTemplate}
        placeholder="Hint: type 'a'"
      />
    </div>
  );
}

export default MyAutoComplete;
