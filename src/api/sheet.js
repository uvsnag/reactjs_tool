import config from '../common/config.js';


export const load = (callback) => {
window.gapi.client.load("sheets", "v4", () => {
  window.gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: config.spreadsheetId,
      range: "Notify!A1:C100"
    })
    .then(
      response => {
        const data = response.result.values;
        console.log(data)
        const items = data.map(item => ({
          eng: item[0],
          vi: item[1],
          customDefine: item[2],
        })) || [];
        callback({
          items
        });
      },
      response => {
        callback(false, response.result.error);
      }
    );
});
}