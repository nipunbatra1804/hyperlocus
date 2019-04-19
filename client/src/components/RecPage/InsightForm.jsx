import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const defaultObject = {
  health: 0.5,
  entertainment: 0.5,
  food: 0.5,
  children: 0.5,
  elderly: 0.5,
  greenery: 0.5
};

export default function InsightForm(props) {
  const [field, setField] = useState(defaultObject);
  const [names, setNames] = useState(defaultObject);
  const [about, setAbout] = useState("");

  const handleChange = (e, { name, value }) => {
    const _field = { ...field };
    _field[name] = parseFloat(value);
    setField(_field);
  };
  const handleAbout = (e, { value }) => {
    setAbout(value);
  };

  const handleName = (e, { name, value }) => {
    const _field = { ...names };
    _field[name] = value;
    setNames(_field);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const { sendRecommendation } = props;
    sendRecommendation(field, about);
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
      {preferences.map(pref => {
        return (
          <Form.Input
            key={pref}
            label={`${pref}: ${field[pref]} `}
            min={0}
            max={1}
            name={pref}
            onChange={handleChange}
            step={0.01}
            type="range"
            value={field[pref]}
          />
        );
      })}

      <Form.TextArea
        label="About"
        placeholder="Tell us more about you..."
        onChange={handleAbout}
      />
      <Form.Checkbox label="I agree to the Terms and Conditions" />
      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

/*
"health": 0.8,
 *		"entertainment": 0.2,
 *		"food": 0.5,
 *		"children": 0.8,
 *		"elderly": 0.7,
 *		"greenery": 0.2

   <Form.Select
          fluid
          label="Gender"
          options={options}
          placeholder="Gender"
        /> 

           <Form.Group inline>
        <label>Size</label>
        <Form.Radio label="Small" value="sm" checked="" onChange="" />
        <Form.Radio label="Medium" value="md" checked="" onChange="" />
        <Form.Radio label="Large" value="lg" checked="" onChange="" />
      </Form.Group>
        */
