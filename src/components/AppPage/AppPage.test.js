import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup } from "react-testing-library";
import AppPage from "./AppPage";

beforeEach(cleanup);

describe("App Page", () => {
  test("By Default the HomePage is rendered", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <AppPage />
      </Router>
    );

    fireEvent.click(getByText(/home/i));
    expect(getByTestId("home-page")).toBeInTheDocument();

    fireEvent.click(getByText(/explore/i));
    expect(getByTestId("explore-page")).toBeInTheDocument();

    fireEvent.click(getByText(/admin/i));
    expect(getByTestId("admin-page")).toBeInTheDocument();
  });

  test.skip('Navigates to ExplorePage when "Explore" is clicked', () => {});
});
