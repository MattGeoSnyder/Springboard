import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({snacks, drinks}) {



  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <div>
              <h3>Snacks: {snacks.length}</h3>
              <h3>Drinks: {drinks.length} </h3>
            </div>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
