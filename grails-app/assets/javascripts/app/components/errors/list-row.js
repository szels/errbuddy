import React from "react";
import SimilarPill from "./common/similar-pill";
import FromNow from "../tools/from-now";
import BaseComponent from "../tools/base-component";
import _ from "lodash";

export default class EntryGroupTableRow extends BaseComponent {

  constructor(props) {
    super(props)
  }

  render() {
    let entryGroup = this.props.entryGroup;
    let newest = entryGroup.newest;

    let app = _.find(this.props.applications, a=> {
      return entryGroup.application === a.id
    });

    if (!newest) {
      return <div />
    }

    var message = (<span>{newest.message}</span>);
    if (!newest.exception) {
      message = (<span>&nbsp;</span>)
    }
    return (
      <div className="list-row" onClick={()=> {
        this.navigate(`/errors/${entryGroup.entryGroupId}/${newest.id}`)
      }}>
        <div className="body">
          <div className="main">
            {newest.exception || newest.message}
          </div>
          <div className="sub">
            {message}
          </div>
        </div>
        <div className="head">
          <div className="time">
            <FromNow time={entryGroup.lastUpdated}/> @ {app ? app.name : newest.hostname}
          </div>
          <div className="similar-column">
            <SimilarPill entryGroup={entryGroup}/>
          </div>
        </div>
      </div>
    );
  }

}
