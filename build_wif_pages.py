import json
import psycopg2
import pathlib
from subprocess import check_output

this_file_path = pathlib.Path(__file__).parent.absolute()

with open('config.json', 'r') as infile:
    data = dict(json.loads(infile.read()))

conn = psycopg2.connect(f"dbname={data['db_name']} user={data['db_login']} host={data['db_host']} password={data['db_password']}")
cur = conn.cursor()

cur.execute( f"SELECT name, id FROM frontend.wif" )
wifs = cur.fetchall()

# make an html page for each wif
for wif in wifs[:5]:
    wif_name = wif[0].replace('/', ' ').replace(' ', '-')
    filepath = pathlib.Path(
        this_file_path,
        'src',
        'wifs',
        f'what-is-{wif_name}-for.html'
    )

    output = check_output(['mustache', 'src/html-templates/template_bits.yaml', 'src/html-templates/wif.mustache', '>']).decode("utf-8")
    output = output.replace('wif_id_goes_here', str(wif[1]))
    output = output.replace('tech_name_goes_here', str(wif_name))

    with open(filepath, 'w') as outfile:
        outfile.write(output)

    print(f'Finished: {wif_name}')