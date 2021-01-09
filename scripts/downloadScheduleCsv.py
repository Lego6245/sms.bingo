import sys
import requests
from string import Template

def main():
  sheet_id = sys.argv[1]
  sheet_name = sys.argv[2]

  fetchUrl = Template('https://docs.google.com/spreadsheets/d/$sheet_id/gviz/tq?tqx=out:csv&sheet=$sheet_name').substitute(sheet_id=sheet_id, sheet_name=sheet_name)

  r = requests.get(fetchUrl, stream=True)

  with open('./schedule.csv', 'wb') as fd:
    for chunk in r.iter_content(chunk_size=128):
      fd.write(chunk)
  fd.close()

main()