import React, { useState } from "react";
import { Form, Dropdown } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const defaultObject = {
  health: { min: 0, max: 1, value: 0.5, step: 0.01 },
  entertainment: { min: 0, max: 1, value: 0.5, step: 0.01 },
  food: { min: 0, max: 1, value: 0.5, step: 0.01 },
  children: { min: 0, max: 1, value: 0.5, step: 0.01 },
  elderly: { min: 0, max: 1, value: 0.5, step: 0.01 },
  greenery: { min: 0, max: 1, value: 0.5, step: 0.01 },
  budget: { min: 1500, max: 3500, value: 2500, step: 100 }
};
const tweetOptions = [
  { key: "@BillGates", text: "Bill Gates", value: "@BillGates" },
  { key: "@jimmyfallon", text: "Jimmy Fallon", value: "@jimmyfallon" },
  { key: "@shakira", text: "Shakira", value: "@shakira" },
  { key: "@britneyspears", text: "Britney Spears", value: "@britneyspears" },
  { key: "@selenagomez", text: "Selena Gomez", value: "@selenagomez" },
  { key: "@realDonaldTrump", text: "Donald Trump", value: "@realDonaldTrump" },
  { key: "@KimKardashian", text: "Kim Kardashian", value: "@KimKardashian" },
  { key: "@ArianaGrande", text: "Ariana Grande", value: "@ArianaGrande" },
  { key: "@jtimberlake", text: "Justin Timberlake", value: "@jtimberlake" },
  { key: "@TheEllenShow", text: "Ellen Degeneres", value: "@TheEllenShow" },
  { key: "@Cristiano", text: "Cristiano Ronaldo", value: "@Cristiano" },
  { key: "@ladygaga", text: "Lady gaga", value: "@ladygaga" },
  { key: "@taylorswift13", text: "Taylor Swift", value: "@taylorswift13" },
  { key: "@rihana", text: "Rihanna", value: "@rihana" },
  { key: "@BarackObama", text: "Barack Obama", value: "@BarackObama" },
  { key: "@katyperry", text: "KATY PERRY", value: "@katyperry" },
  { key: "@narendramodi", text: "Narendra Modi", value: "@narendramodi" },
  { key: "@Oprah", text: "Oprah Winfrey", value: "@Oprah" }
];
const disableAbout = true;

export default function InsightForm(props) {
  const [field, setField] = useState(defaultObject);
  const [names, setNames] = useState(defaultObject);
  const [about, setAbout] = useState("");
  const [address, setAdress] = useState("");
  const [userLoc, setUserLoc] = useState(false);
  const [allow, setAllow] = useState(false);
  const [tweets, setTweets] = useState(null);
  const handleChange = (e, { name, value }) => {
    const _field = { ...field };
    _field[name].value = parseFloat(value);
    setField(_field);
  };
  const handleAbout = (e, { value }) => {
    if (about.length > 500) {
      setAllow(true);
    }
    setAbout(value);
  };
  const handleAddress = (e, { value }) => {
    setAdress(value);
  };

  const handleName = (e, { name, value }) => {
    const _field = { ...names };
    _field[name] = value;
    setNames(_field);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const { sendRecommendation } = props;
    console.log(tweets);
    sendRecommendation(field, about, address, tweets);
  };
  const handleCheck = event => {
    setUserLoc(!userLoc);
  };

  const handleDropDown = (e, { value }) => {
    setAllow(true);
    setTweets(value);
  };

  const addTweet = (e, { value }) => {
    tweetOptions.push({
      key: value,
      text: value,
      value
    });
  };

  const preferences = Object.keys(field);
  const { formLoading } = props;
  return (
    <Form loading={formLoading} onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="First name"
          placeholder="First name"
          onChange={handleName}
        />
        <Form.Input
          fluid
          label="Last name"
          placeholder="Last name"
          onChange={handleName}
        />
      </Form.Group>
      <Form.Input
        disabled={userLoc}
        label="Address"
        placeholder="or Post code"
        onChange={handleAddress}
        value={address}
      />

      <Form.Checkbox
        label="Use my current location"
        checked={userLoc}
        onChange={handleCheck}
      />

      <Dropdown
        label="Who would you idealize"
        placeholder="Select or Add Tweets by @{someone}"
        fluid={true}
        search
        selection
        multiple={false}
        options={tweetOptions}
        onChange={handleDropDown}
        allowAdditions={true}
        onAddItem={addTweet}
      />
      <br />
      {preferences.map(pref => {
        return (
          <Form.Input
            key={pref}
            label={`${pref}: ${field[pref].value} `}
            min={field[pref].min}
            max={field[pref].max}
            name={pref}
            onChange={handleChange}
            step={field[pref].step}
            type="range"
            value={field[pref].value}
          />
        );
      })}

      {!disableAbout && (
        <Form.TextArea
          label="About"
          placeholder="Tell us more about you... in more than 500 character"
          onChange={handleAbout}
          error={!allow}
        />
      )}
      <Form.Button disabled={!allow}>Submit</Form.Button>
    </Form>
  );
}
