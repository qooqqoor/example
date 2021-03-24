import React, { lazy,Suspense  } from "react";
import {Route,Link,BrowserRouter,Switch} from "react-router-dom"

const HomePage = lazy(() =>
  import(
    '../page/homepage'
    )
)
const Bluetooth = lazy(() =>
  import(
    '../page/bluetooth'
    )
)

const Notification = lazy(() =>
  import(
    '../page/notification'
    )
)

class RouterPage extends React.Component{
  render() {

    return (


      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {/* The corresponding component will show here if the current URL matches the path */}
            <Route path="/" exact component={HomePage} />
            <Route path="/bluetooth" exact component={Bluetooth} />
            <Route path="/notification" exact component={Notification} />
          </Suspense>
        </Switch>
      </BrowserRouter>

    )
  }
}

export   {RouterPage}
