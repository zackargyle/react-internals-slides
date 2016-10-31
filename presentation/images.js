import preloader from "spectacle/lib/utils/preloader";

const images = {
  events: {
    handlers: require("../assets/images/event-handlers.png")
  },
  fiber: {
    priority: require("../assets/images/fiber-priority.png"),
    relationships: require("../assets/images/fiber-relationships.png")
  },
  gifs: {
    party: require("../assets/images/party.gif"),
    waiting: require("../assets/images/waiting-for-you.gif")
  },
  lifecycle: {
    state: require("../assets/images/state-lifecycle.png")
  },
  list: {
    withkeys: require("../assets/images/with-keys.png"),
    nokeys: require("../assets/images/no-keys.png")
  },
  reconciliation: require("../assets/images/reconciliation.jpg"),
  tree: {
    dirty: require("../assets/images/tree-dirty.png"),
    render: require("../assets/images/tree-render.png"),
    update: require("../assets/images/tree-update.png")
  }
};

preloader(images);
export default images;
