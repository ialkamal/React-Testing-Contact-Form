import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitForElement,
  getByTestId,
} from "@testing-library/react";
import App from "./App";
import getResponse from "./services/getResponse";

jest.mock("./services/getResponse");

test("renders App without crashing", () => {
  render(<App />);
});

test("Check Firstname empty field", async () => {
  render(<App />);

  const firstName = screen.getByTestId("firstName");

  await act(async () => {
    fireEvent.change(firstName, { target: { value: "" } });
    fireEvent.blur(firstName);
  });

  expect(firstName).toBeInTheDocument();
  expect(firstName).toHaveValue("");
  expect(screen.queryByTestId("firstNameError")).toBeInTheDocument();
});

test("Check Firstname errors", async () => {
  render(<App />);

  const firstName = screen.getByTestId("firstName");

  await act(async () => {
    fireEvent.change(firstName, { target: { value: "Ismail" } });
    fireEvent.blur(firstName);
  });

  expect(firstName).toBeInTheDocument();
  expect(firstName).toHaveValue("Ismail");
  expect(screen.queryByTestId("firstNameError")).not.toBeInTheDocument();
});

test("Check Lastname empty field", async () => {
  render(<App />);

  const lastName = screen.getByTestId("lastName");

  await act(async () => {
    fireEvent.change(lastName, { target: { value: "" } });
    fireEvent.blur(lastName);
  });

  expect(lastName).toBeInTheDocument();
  expect(lastName).toHaveValue("");
  expect(screen.queryByTestId("lastNameError")).toBeInTheDocument();
});

test("Check Lastname errors", async () => {
  render(<App />);

  const lastName = screen.getByTestId("lastName");

  await act(async () => {
    fireEvent.change(lastName, { target: { value: "Al Kamal" } });
    fireEvent.blur(lastName);
  });

  expect(lastName).toBeInTheDocument();
  expect(lastName).toHaveValue("Al Kamal");
  expect(screen.queryByTestId("lastNameError")).not.toBeInTheDocument();
});

test("Check Email empty field", async () => {
  render(<App />);

  const email = screen.getByTestId("email");

  await act(async () => {
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.blur(email);
  });

  expect(email).toBeInTheDocument();
  expect(email).toHaveValue("");
  expect(screen.queryByTestId("emailError")).toBeInTheDocument();
});

test("Check Correct Email errors", async () => {
  render(<App />);

  const email = screen.getByTestId("email");

  await act(async () => {
    fireEvent.change(email, { target: { value: "ismail@nawatt.com" } });
    fireEvent.blur(email);
  });

  expect(email).toBeInTheDocument();
  expect(email).toHaveValue("ismail@nawatt.com");
  expect(screen.queryByTestId("emailError")).not.toBeInTheDocument();
});

test("Check Email format errors", async () => {
  render(<App />);

  const email = screen.getByTestId("email");

  await act(async () => {
    fireEvent.change(email, { target: { value: "Ismail" } });
    fireEvent.blur(email);
  });

  expect(email).toBeInTheDocument();
  expect(email).toHaveValue("Ismail");
  expect(screen.queryByTestId("emailError")).toBeInTheDocument();
});

test("Check Response from REQ/RES errors", async () => {
  render(<App />);

  const submit = screen.getByTestId("submit");

  await act(async () => {
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "Ismail" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Al Kamal" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "ismail.alkamal@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("message"), {
      target: { value: "Welcome to Lambda school" },
    });
    fireEvent.click(submit);
  });

  // const sampleResponse = {
  //   firstName: "Ismail",
  //   lastName: "Al Kamal",
  //   email: "ismail.alkamal@gmail.com",
  //   message: "Welcome to Lambda school",
  //   id: "522",
  //   createdAt: "2020-11-03T12:39:29.511Z",
  // };

  // getResponse.mockResolvedValueOnce(sampleResponse);

  expect(getResponse).toHaveBeenCalledTimes(1);
});
