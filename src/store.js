import { observable, computed } from 'mobx';
import moment from 'moment';
import _ from "lodash";
import Parse from "parse";

Parse.initialize(process.env.APP_ID || 'myAppId');
Parse.serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

class Bdc {
  id = null;
  MAX_DAYS = 1000;

  @observable editMode = false;
  @observable days = 5;
  @observable points = 10;
  @observable name = "Une BDC";
  @observable startDate = moment().format("YYYY-MM-DD");
  @observable done = [0,"", "", "", "", ""];

  constructor(id=Math.random()) {
    this.id = id;
  }

  @computed get chartData() {
    const data = []
    for (let i = 0; i <= this.days; i++ ) {
      let actual
      if (this.done[i] !== "")
      {
        actual = this.points - this.done[i]
      } else {
        actual = null
      }

      data.push({
        day: moment(this.startDate).add(i, 'days').format("DD/MM"),
        ideal: (this.days - i) * (this.points /this.days),
        actual: actual
      })
    }
    return data;
  }

  setDays(value) {
    if (value > this.MAX_DAYS) {
      value = this.MAX_DAYS;
    }
    if (value > this.days && this.done.length <= value) {
      this.done = _.concat(this.done.slice(), _.times(value - this.days, () => ""))
    }
    this.days = value;
  }

  setName(value) {
    this.name = value;
  }

  setPoints(value) {
    this.points = value;
  }

  setStartDate(date) {
    this.startDate = moment(date).format('YYYY-MM-DD');
  }

  setDone(value, index) {
    if (this.done[index] === "") {
      this.done[index] = this.done[index-1];
    } else {
      this.done[index] = value;
    }
  }

  clearDone(index) {
    this.done[index] = "";
  }

  updateFromParse(result) {
    this.days = result.get("days");
    this.points = result.get("points");
    this.name = result.get("name");
    this.startDate = moment(result.get("startDate").toISOString()).format("YYYY-MM-DD");
    this.done = result.get("done");
  }

}


class BdcStore {
  parseBdcs = []
  BurndownChart = Parse.Object.extend("BurndownChart");

  @observable bdcs = [];


  constructor() {
    this.loadBdcs();
  }

  @computed get getIds() {
    return _.map(this.bdcs, 'id')
  }

  bdcToParse(bdc, parseBdc) {
    parseBdc.set("days", bdc.days);
    parseBdc.set("points", bdc.points);
    parseBdc.set("name", bdc.name);
    parseBdc.set("startDate", moment(bdc.startDate).toDate());
    parseBdc.set("done", bdc.done.slice());
  }

  createBdc() {
    const parseBdc = new this.BurndownChart();
    const bdc = new Bdc()
    this.bdcToParse(bdc, parseBdc);
    parseBdc.save(null, {
      success: (parseBdc) => {
        bdc.id =  parseBdc.id;
        this.bdcs.push(bdc)
      },
      error: (parseBdc, error) => {
        console.log("Error: " + error.message);
      }
    });
  }

  save() {
    const promises = []
    this.parseBdcs.forEach((parseBdc, index) => {
      this.bdcToParse(this.bdcs[index], parseBdc);
      promises.push(parseBdc.save())
    })
    return promises
  }

  deleteBdc(id) {
    const index = _.findIndex(this.bdcs, {id: id})
    this.bdcs.splice(index, 1);
    this.parseBdcs[index].destroy()
    this.parseBdcs.splice(index, 1);
  }

  loadBdcs() {
    const query = new Parse.Query(this.BurndownChart);
    query.find((results) => {
      this.parseBdcs = results;
      return results.forEach(result => this.updateBdcsFromServer(result));
    });
  }

  getBdcById(id) {
    return _.find(this.bdcs, {'id': id})
  }

  updateBdcsFromServer(result) {
    const bdc = new Bdc(result.id);
    bdc.updateFromParse(result);
    this.bdcs.push(bdc);
  }
}

const bdcStore = new BdcStore()

export default bdcStore;
