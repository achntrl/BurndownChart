import { observable, computed } from 'mobx';
import moment from 'moment';
import _ from "lodash";
import Parse from "parse";

Parse.initialize(process.env.APP_ID || 'myAppId');
Parse.serverURL = process.env.SERVER_URL || 'https://fast-hamlet-28839.herokuapp.com/parse'

class Bdc {
  id = null;

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
      let remaining
      if (this.done[i] !== "")
      {
        remaining = this.points - this.done[i]
      } else {
        remaining = null
      }

      data.push({
        day: moment(this.startDate).add(i, 'days').format("DD/MM"),
        points: (this.days - i) * (this.points /this.days),
        remaining: remaining
      })
    }
    return data;
  }

  setDays(value) {
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
    this.parseBdcs.forEach((parseBdc, index) => {
      this.bdcToParse(this.bdcs[index], parseBdc);
      parseBdc.save()
    })
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
