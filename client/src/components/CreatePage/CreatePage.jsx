import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "../common/Input";
import Select from "../common/Select";
import { createOutlet, getOutlet } from "../../services/serviceOutlets";

export default class CreatePage extends Component {
  state = {
    categories: ["healthcare", "Food", "retail"],
    data: {
      category: "",
      name: "",
      type: "",
      postalCode: "",
      address: "",
      openingTime: "",
      closingTime: "",
      tags: ""
    },
    errors: {}
  };

  schema = {
    category: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    postalCode: Joi.number()
      .integer()
      .min(1)
      .required(),
    address: Joi.string().required(),
    openingTime: Joi.string().alphanum(),
    closingTime: Joi.string().alphanum(),
    tags: Joi.string()
  };

  validateField = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const data = { ...this.state.data };
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
    return errors;
  };
  handleSelect = event => {
    const copy = { ...this.state.data };
    const keyName = event.target.name;
    const value = event.target.value;
    copy[keyName] = value;

    console.log(copy[keyName]);
    this.setState({ data: copy });
  };
  handleChange = ({ currentTarget: input }) => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateField(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };
  handleSubmit = event => {
    const id = this.props.match ? this.props.match.params.id : null;
    event.preventDefault();
    const copy = { ...this.state.data };
    createOutlet(copy, id);
    this.props.history.push("/home");
  };

  async componentDidMount() {
    const id = this.props.match ? this.props.match.params.id : null;
    if (!id) {
      return;
    }
    const outlet = await getOutlet(id);
    const copy = {};
    copy.category = outlet.category;
    copy.name = outlet.name;
    copy.type = outlet.type;
    copy.postalCode = outlet.postalCode;
    copy.address = outlet.address;
    copy.openingTime = outlet.openingTime;
    copy.closingTime = outlet.closingTime;
    copy.tags = "#" + outlet.tags.map(elem => elem.name).join(",#");
    console.log(copy);
    this.setState({ data: copy });
  }

  render() {
    const {
      category,
      name,
      type,
      postalCode,
      address,
      openingTime,
      closingTime,
      tags
    } = this.state.data;
    const { errors } = this.state;
    return (
      <div className="w-50  mt-4 mx-auto">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Input
              type={"text"}
              name="Name"
              handleChange={this.handleChange}
              value={name}
              error={errors.name}
            />
            <Input
              type={"text"}
              name="Type"
              handleChange={this.handleChange}
              value={type}
              error={errors.name}
            />
            <Input
              type={"text"}
              name="Address"
              handleChange={this.handleChange}
              value={address}
              error={errors.name}
            />
            <Input
              type={"number"}
              name="Postal Code"
              handleChange={this.handleChange}
              value={postalCode}
              error={errors.name}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <Input
                type={"text"}
                name="Opening Time"
                handleChange={this.handleChange}
                value={openingTime ? openingTime : ""}
                error={errors.name}
              />
            </div>
            <div className="form-group col-md-6">
              <Input
                type={"text"}
                name="Closing Time"
                handleChange={this.handleChange}
                value={closingTime ? closingTime : ""}
                error={errors.name}
              />
            </div>
          </div>
          <Select
            name="category"
            options={this.state.categories}
            handleChange={this.handleSelect}
            keyName="category"
            value={category}
          />
          <Input
            type={"text"}
            name="tags"
            keyName="tags"
            handleChange={this.handleChange}
            value={tags}
            error={errors.name}
          />
          <div className="row justify-content-end mt-4">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
