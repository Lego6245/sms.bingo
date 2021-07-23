import sys
import requests
from string import Template

def main():
  sheet_id = sys.argv[1]
  sheet_name = sys.argv[2]
  sheet_range = sys.argv[3]

  fetchUrl = Template('https://docs.google.com/spreadsheets/d/$sheet_id/gviz/tq?tqx=out:csv&sheet=$sheet_name&range=$sheet_range').substitute(sheet_id=sheet_id, sheet_name=sheet_name, sheet_range=sheet_range)

  r = requests.get(fetchUrl, stream=True)

  with open('./public/schedule.csv', 'wb') as fd:
    for chunk in r.iter_content(chunk_size=128):
      fd.write(chunk)
  fd.close()

main()