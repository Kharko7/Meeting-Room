import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";

const onClick = jest.fn(() => {});

describe("General button tests", () => {
  it("Button should  be defined", () => {
    render(<IconButton onclick={onClick}></IconButton>);
    const iconButtonElement = screen.getByTestId("iconButton");
    expect(iconButtonElement).toBeDefined();
  });
  it("After clicking butonn onclick function should be called ", () => {
    render(<IconButton  onclick={onClick}></IconButton>);
    const iconButtonElement = screen.getByTestId("iconButton");
    fireEvent.click(iconButtonElement);
    expect(onClick).toBeCalled();
  });
  it("After clicking butonn onclick function should be called ", () => {
    render(<IconButton ></IconButton>);
    const iconButtonElement = screen.getByTestId("iconButton");
    fireEvent.click(iconButtonElement);
    expect(onClick).not.toBeCalled();
  });
});
describe("Button tests with passing type parameters to a component", () => {
  it("The component must have class edit", () => {
    render(<IconButton type="edit" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("edit");
  });
  it("The component must have class settings", () => {
    render(<IconButton type="settings" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("settings");
  });
  it("The component must have class delete", () => {
    render(<IconButton type="delete" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("delete");
  });
  it("The component must have class home", () => {
    render(<IconButton type="home" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("home");
  });
  it("The component must have class close", () => {
    render(<IconButton type="close" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("close");
  });
  it("The component must have class agenda", () => {
    render(<IconButton type="agenda" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("agenda");
  });
  it("The component must have class rooms", () => {
    render(<IconButton type="rooms" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("rooms");
  });
  it("The component must have class map", () => {
    render(<IconButton type="map" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("map");
  });
  it("The component must have class calendar", () => {
    render(<IconButton type="calendar" onclick={onClick} />);
    const toggleElement = screen.getByTestId("iconButton");
    expect(toggleElement.classList[1]).toBe("calendar");
  });

});
describe("Button tests with passing size parameters to a component", () => {
    it("The component must have class small", () => {
      render(<IconButton size="small" onclick={onClick}/>);
      const toggleElement = screen.getByTestId("iconButton");
      expect(toggleElement.classList[2]).toBe("small");
    });
    it("The component must have class medium", () => {
      render(<IconButton size="medium" onclick={onClick}/>);
      const toggleElement = screen.getByTestId("iconButton");
      expect(toggleElement.classList[2]).toBe("medium");
    });

    it("The component must have class large", () => {
      render(<IconButton size="large" onclick={onClick}/>);
      const toggleElement = screen.getByTestId("iconButton");
      expect(toggleElement.classList[2]).toBe("large");
    });
});
describe("Button tests with passing mg (margin) parameters to a component", () => {
    it("The component must have class margin", () => {
      render(<IconButton mg={true} onclick={onClick} />);
      const toggleElement = screen.getByTestId("iconButton");
      expect(toggleElement.classList[3]).toBe("margin");
    });
    it("The component mustn`t have class none", () => {
      render(<IconButton mg={false} onclick={onClick} />);
      const toggleElement = screen.getByTestId("iconButton");
      expect(toggleElement.classList[3]).not.toBe("margin");
    });
});
