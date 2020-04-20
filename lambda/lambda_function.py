#!/usr/bin/python3
import psycopg2
import os
import json

rds_host  = os.environ['db_endpoint']
name = os.environ['db_username']
password = os.environ['db_password']
db_name = 'all_data'
port = 5432

conn = psycopg2.connect(f"dbname={db_name} user={name} host={rds_host} password={password}")
cur = conn.cursor()

def get_results(cur, search_string):
    cur.execute( f"SELECT * FROM wif WHERE name ilike '%{search_string}%'" )

    for id, name, tag1_id, tag2_id, tag3_id in cur.fetchall() :
        yield id, name, tag1_id, tag2_id, tag3_id

def make_api_gateway_response(status_code, result):
    return {
        "isBase64Encoded": False,
        "statusCode": status_code,
        "headers": { "Access-Control-Allow-Origin": "*" },
        "body": json.dumps(result)
    }

def lambda_handler(event, context):
    """
    This function performs fuzzy searches to return wif search results.
    """
    search_string = event['queryStringParameters']['search_string']
    results = [wif for wif in get_results(cur, search_string)]

    return make_api_gateway_response(200, results)

