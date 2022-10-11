import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const baseURL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    "Content-Type": "text/json",
  },
});

// mock adapter in order to simulate api requests/responses
const mockAdapter = new MockAdapter(instance, { delayResponse: 1000 });

mockAdapter.onGet("properties").reply(200, [
  {
    id: 1,
    name: "name",
    plan: "plan number",
    units: 0,
    city: "Sofia",
    region: 0,
    manager: 0,
  },
  {
    id: 2,
    name: "name2",
    plan: "plan number2",
    units: 2,
    city: "Plovdiv",
    region: 2,
    manager: 1,
  },
  {
    id: 3,
    name: "name 3",
    plan: "some plan number",
    units: 2,
    city: "Varna",
    region: 1,
    manager: 2,
  },
]);

mockAdapter.onPost("properties").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onGet("properties/1").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
    {
      id: 1,
      lotAlpha: "2",
      floor: 3,
      type: "Residential2",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onGet("properties/2").reply(200, {
  id: 2,
  name: "Item 2",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
    {
      id: 1,
      lotAlpha: "2",
      floor: 3,
      type: "Residential2",
    },
  ],
  city: "Sofia",
  region: 2,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onGet("properties/3").reply(200, {
  id: 3,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
    {
      id: 1,
      lotAlpha: "2",
      floor: 3,
      type: "Residential2",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onDelete("properties/1").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});
mockAdapter.onDelete("properties/2").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onPut("properties/1").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onPut("properties/2").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onPut("properties/3").reply(200, {
  id: 1,
  name: "name",
  plan: "plan number",
  units: [
    {
      id: 0,
      lotAlpha: "1",
      floor: 0,
      type: "Residential",
    },
  ],
  city: "Sofia",
  region: 0,
  manager: 0,
  previousManager: 0,
  managementCompany: "Some Company",
  planRegistered: new Date().toISOString(),
  address: "address",
  account: "acc",
  abn: "ABN",
});

mockAdapter.onGet("manager/0").reply(200, {
  id: 0,
  firstName: "John",
  lastName: "Smith",
  managedSince: "2020-12-12",
});

mockAdapter
  .onGet("manager/2")
  .networkErrorOnce()
  .onGet("manager/2")
  .reply(200, {
    id: 1,
    firstName: "Smith",
    lastName: "Jognson",
    managedSince: "2022-12-12",
  });

mockAdapter.onGet("manager/1").reply(200, {
  id: 2,
  firstName: "Smith",
  lastName: "Jognson",
  managedSince: "2022-12-12",
});

mockAdapter.onGet("regions").reply(200, [
  {
    id: 0,
    name: "Queensland",
  },
  {
    id: 1,
    name: "Georgia",
  },
  {
    id: 2,
    name: "Miami",
  },
]);

export default instance;
