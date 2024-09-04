import request from 'superagent'

const rootUrl = '/api/v1'

export async function Search({props}){
  if (props.searchType === "accommodation"){
  const res = await request.get(rootUrl + '/accommodation').send({"start_date":props.date})//need more data in .send()
  return res.body
  }else{
    const res = await request.get(rootUrl + '/attraction').send({"start_date":props.date})//need more data in .send()
  return res.body
  }
}