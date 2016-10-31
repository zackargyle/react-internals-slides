/*
  - Internal Data Structures
  - Reconciliation
  - Events
  - Fiber
*/

import React from "react";
import {
  Link,
  Quote,
  CodePane,
  Deck,
  Heading,
  Image,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import images from "./images";
import theme from "./theme";

require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const CodeStyle = { minWidth: "60%", maxWidth: "60%", fontSize: "1rem", display: "inline-block", verticalAlign: "top" };

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              React Internals
            </Heading>
            <Heading size={1} fit caps lineHeight={1.2} textColor="black">
              A Web CX Knowledge-Week Deep Dive
            </Heading>
            <Text caps lineHeight={3} textColor="tertiary">
              <b>Zack Argyle</b>
            </Text>
          </Slide>

          <Slide>
            <Text lineHeight={3} textColor="tertiary">
              Let's get this party started!
            </Text>
            <Image src={images.gifs.party.replace("/", "")} margin="0 20%" width="60%"/>
          </Slide>

          <Slide>
            <Text lineHeight={3} textColor="tertiary">
              It all starts with a little JSX
            </Text>
            <CodePane
              lang="js"
              style={CodeStyle}
              source={require("raw!../assets/snippets/jsx")}
            />
            <Text lineHeight={3} textColor="tertiary">
              But what does that block actually do?
            </Text>
          </Slide>

          <Slide>
            <Text style={{ marginBottom: "30px"}} textColor="tertiary">
              JSX is transpiled into calls to React.createElement, which is why React must always be in scope.
            </Text>
            <CodePane
              lang="js"
              style={{ ...CodeStyle, fontSize: ".9rem", minWidth: "50%", maxWidth: "50%" }}
              source={require("raw!../assets/snippets/jsx")}
            />
            <CodePane
              lang="js"
              style={{ ...CodeStyle, fontSize: ".9rem", minWidth: "50%", maxWidth: "50%" }}
              source={require("raw!../assets/snippets/create-element")}
            />
            <Text style={{ marginBottom: "30px"}} textColor="tertiary">
              1) Component 2) Props 3) ...children
            </Text>
          </Slide>

          <Slide>
            <Text textColor="tertiary">
              What does React.createElement() return?
            </Text>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Internal Data Structures
            </Heading>
            <Text>
              <ol style={{ fontSize: "2rem", textAlign: "left" }}>
                <li><b>React Element</b>
                  <ul><li>Result of React.createElement</li></ul>
                </li>
                <li><b>Public Instance</b>
                  <ul><li>An instance of your component class ("this")</li></ul>
                </li>
                <li><b>Internal Instance</b>
                  <ul><li>Extra React specific information about your component</li></ul>
                </li>
                <li><b>Rendered Component</b>
                  <ul><li>Result of a public instance's render call</li></ul>
                </li>
              </ol>
            </Text>
          </Slide>

          <Slide>
            <Text lineHeight={2} textColor="tertiary">
              React Element
            </Text>
            <CodePane
              lang="js"
              style={CodeStyle}
              source={require("raw!../assets/snippets/react-element")}
            />
          </Slide>

          <Slide>
            <Text lineHeight={2} textColor="tertiary">
              Public Instance
            </Text>
            <CodePane
              lang="js"
              style={{ ...CodeStyle, minHeight: "530px", fontSize: ".8rem" }}
              source={require("raw!../assets/snippets/public-instance")}
            />
          </Slide>

          <Slide>
            <Text lineHeight={2} textColor="tertiary">
              Internal Instance
            </Text>
            <CodePane
              lang="js"
              style={{ ...CodeStyle, minHeight: "530px", minWidth: "50%", maxWidth: "50%" }}
              source={require("raw!../assets/snippets/internal-instance")}
            />
            <CodePane
              lang="js"
              style={{ ...CodeStyle, fontSize: ".8rem", minHeight: "530px", minWidth: "50%", maxWidth: "50%" }}
              source={require("raw!../assets/snippets/internal-instance-prototype")}
            />
          </Slide>

          <Slide notes="Differs based on render target: native or DOM.">
            <Text lineHeight={2} textColor="tertiary">
              Rendered Component
            </Text>
            <CodePane
              lang="js"
              style={{ ...CodeStyle, fontSize: ".9rem" }}
              source={require("raw!../assets/snippets/rendered-component")}
            />
          </Slide>

          <Slide>
            <Image src={images.reconciliation.replace("/", "")} margin="0 20%" width="60%"/>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Reconciliation
            </Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>Mark components as dirty</li>
                <li>Render all instances with pending updates</li>
                <li>Build mutation list by reconciling changes</li>
                <li>Update DOM</li>
              </ol>
            </Text>
          </Slide>

          <Slide maxWidth="90%">
            <Text lineHeight={2} textColor="tertiary">
              Props or State Change
            </Text>
            <div style={{ textAlign: "left" }}>
              <Image src={images.tree.dirty.replace("/", "")} margin="2.5%" width="28%"/>
            </div>
          </Slide>

          <Slide maxWidth="90%">
            <Text lineHeight={2} textColor="tertiary">
              Tree renders starting at dirty nodes
            </Text>
            <div style={{ textAlign: "left" }}>
              <Image src={images.tree.dirty.replace("/", "")} margin="2.5%" width="28%"/>
              <Image src={images.tree.render.replace("/", "")} margin="2.5%" width="28%"/>
            </div>
          </Slide>

          <Slide maxWidth="90%">
            <Text lineHeight={2} textColor="tertiary">
              DOM Updates after updates identified
            </Text>
            <div style={{ textAlign: "left" }}>
              <Image src={images.tree.dirty.replace("/", "")} margin="2.5%" width="28%"/>
              <Image src={images.tree.render.replace("/", "")} margin="2.5%" width="28%"/>
              <Image src={images.tree.update.replace("/", "")} margin="2.5%" width="28%"/>
            </div>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Optimizations
            </Heading>
            <Text>Full tree diffing is a O(n<sup>3</sup>) operation. So a few assumptions and shortcuts are taken so that it can be performed in O(n).</Text>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Assumptions
            </Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>Elements of different types cannot be reconciled</li>
                <li>Elements cannot move vertically</li>
                <li>List item keys determine horizontal reuse</li>
              </ol>
            </Text>
          </Slide>

          <Slide>
            <Image src={images.list.nokeys.replace("/", "")} margin="2.5%" width="100%"/>
          </Slide>

          <Slide>
            <Image src={images.list.withkeys.replace("/", "")} margin="2.5%" width="100%"/>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              setState
            </Heading>
            <Text>Full internal lifecycle from call to DOM update</Text>
          </Slide>

          <Slide notes="React loves queues and batches.">
            <Image src={images.lifecycle.state.replace("/", "")} width="100%"/>
          </Slide>

          <Slide notes="Virtual event bubbling.">
            <Heading size={1} fit caps lineHeight={1}>
              Events in React
            </Heading>
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Synthetic Events
            </Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>Event are cross-browser compatible.</li>
                <li>Event objects are pooled.</li>
                <li>Event handlers are grouped.</li>
              </ol>
            </Text>
          </Slide>

          <Slide notes="Avoids expensive listeners and DOM bubbling.">
            <Image src={images.events.handlers.replace("/", "")} margin="2.5%" width="100%"/>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>Fiber</Heading>
            <Image src={images.gifs.waiting.replace("/", "")} margin="2.5%" width="100%"/>
          </Slide>

          <Slide notes="Virtual event bubbling.">
            <Heading size={1}fit caps lineHeight={2}>What is Fiber?</Heading>
            <Quote style={{ color: "#000", fontSize: "24px", fontWeight: "normal", textAlign: "left" }}>
              "Fiber reimplements the reconciler. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture." - acdlite
            </Quote>
          </Slide>

          <Slide notes="Not all updates are created equally.">
            <Heading size={1} fit caps lineHeight={2}>Why Fiber?</Heading>
            <Text>
              Reconciliation of non-vital elements is costly, especially with things like animations. By rewriting the reconciler it is possible to prioritize work and speed up the overall frame rate.
            </Text>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>What is a Fiber?</Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>A virtual stack frame</li>
                <li>A unit of "work"</li>
                <li>Pausable / Prioritizable / Memoizable / Abortable</li>
              </ol>
            </Text>
          </Slide>

          <Slide notes="The child fiber is the first child and the sibling fiber is a singly-linked list. Memoized props is tested for output reuse. Alternate is the corresponding fiber between flushed and work-in-progress fibers. The output corresponds to the reconciled host component tree.">
            <Heading size={1} fit lineHeight={2}>What does it look like?</Heading>
            <CodePane
              lang="js"
              style={{ ...CodeStyle }}
              source={require("raw!../assets/snippets/fiber")}
            />
          </Slide>

          <Slide notes="Avoids expensive listeners and DOM bubbling.">
            <Image src={images.fiber.relationships.replace("/", "")} width="100%"/>
          </Slide>

          <Slide>
            <Heading style={{ fontSize: "5rem" }} lineHeight={2}>Fiber Prioritization</Heading>
            <CodePane
              lang="js"
              style={{ ...CodeStyle, minHeight: "240px", minWidth: "30%", maxWidth: "30%" }}
              source={require("raw!../assets/snippets/priorities")}
            />
            <CodePane
              lang="js"
              style={{ ...CodeStyle, minHeight: "240px", minWidth: "70%", maxWidth: "70%" }}
              source={require("raw!../assets/snippets/priorities-desc")}
            />
          </Slide>

          <Slide notes="Avoids expensive listeners and DOM bubbling.">
            <Image src={images.fiber.priority.replace("/", "")} width="75%"/>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>Quirks</Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>componentWillUpdate may be called multiple times before componentDidUpdate</li>
                <li>No frame guarantee of when an update will occur</li>
                <li>Pausable / Prioritizable / Memoizable / Abortable</li>
              </ol>
            </Text>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>Benefits</Heading>
            <Text>
              <ol style={{ textAlign: "left" }}>
                <li>Smoother animations/scrolling</li>
                <li>Smoother user interactions</li>
                <li>Better CPU usage</li>
                <li>Streamable server rendering?</li>
              </ol>
            </Text>
          </Slide>

          <Slide>
            <Link target="_blank" href="http://isfiberreadyyet.com">Is Fiber Ready Yet?</Link>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={1}>Questions?</Heading>
            <Heading size={1} caps lineHeight={1}>😁</Heading>
          </Slide>

          <Slide>
            <Heading size={1} caps lineHeight={2}>Links</Heading>
            <ol style={{ textAlign: "left", width: "300px", margin: "0 auto" }}>
              <li>
                <Link target="_blank" href="https://github.com/acdlite/react-fiber-architecture">Fiber</Link>
              </li>
              <li>
                <Link target="_blank" href="https://facebook.github.io/react/docs/reconciliation.html">Reconcilliation</Link>
              </li>
              <li>
                <Link target="_blank" href="https://facebook.github.io/react/docs/events.html">Events</Link>
              </li>
              <li>
                <Link target="_blank" href="http://reactkungfu.com/2016/03/dive-into-react-codebase-handling-state-changes/">SetState</Link>
              </li>
            </ol>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
