import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Login from "../component/Login"
import Signup from "../component/Signup"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PanelChoice() {
  const tabNames = ["Se connecter", "Créer un compte"]

  return (
    <div className="">
      <Tab.Group>
        <Tab.List className="">
          {tabNames.map((name, index) => (
            <Tab
              key={name}
              className={({ selected }) =>
                classNames(
                  '',
                  selected ? '' : '',
                  index === 0 ? "" : ""
                )
              }
            >
              {name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="">
            <Tab.Panel>
              <Login />
            </Tab.Panel>
            <Tab.Panel>
              <Signup />
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}