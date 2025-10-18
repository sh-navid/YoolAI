import xml.etree.ElementTree as ET
import json
import os,sys

def extract_location_data(osm_file_path, tags_of_interest):
    """
    Extracts location data (nodes) from an OSM file, filtering by specified tags.

    Args:
        osm_file_path (str): Path to the OSM file.
        tags_of_interest (dict): A dictionary where keys are OSM tag keys
                                    and values are lists of acceptable values.

    Returns:
        list: A list of dictionaries, each representing a location.  Returns None on error.
    """
    try:
        tree = ET.parse(osm_file_path)
        root = tree.getroot()
    except FileNotFoundError:
        print(f"Error: File not found: {osm_file_path}")
        return None
    except ET.ParseError:
        print(f"Error: Could not parse the XML file: {osm_file_path}")
        return None

    locations = []
    for node in root.iter('node'):
        lat = node.get('lat')
        lon = node.get('lon')
        node_id = node.get('id')

        if lat is None or lon is None or node_id is None:
            continue

        try:
            lat = float(lat)
            lon = float(lon)
        except ValueError:
            continue

        location = {
            "Id": int(node_id),  # Assuming node ID can be used as a unique identifier
            "Lat": lat,
            "Lon": lon,
            "Name": "",  # Initialized, will be filled if tag matches
            "GpsLocationTypeId": -1  # Placeholder, will be derived from tags
        }

        for tag in node.iter('tag'):
            k = tag.get('k')
            v = tag.get('v')

            if k in tags_of_interest:
                if v in tags_of_interest[k]:
                    location["Name"] = v  # Or some other appropriate value, if needed
                    location["GpsLocationTypeId"] = tags_of_interest[k].index(v) + 1 # 1-based indexing for id
                    break #Only pick first match


        if location["GpsLocationTypeId"] != -1:
             locations.append(location)


    return locations

def write_json_file(data, output_file_path):
    """
    Writes the extracted location data to a JSON file.

    Args:
        data (list): A list of location dictionaries.
        output_file_path (str): The path to the output JSON file.
    """
    try:
        with open(output_file_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Successfully wrote location data to: {output_file_path}")
    except Exception as e:
        print(f"Error writing to file: {e}")



if __name__ == "__main__":
    osm_file = sys.path[0]+ "/map.osm"  # Ensure this is the path to your OSM file!
    output_json_file = sys.path[0]+ "/locations.json"

    # Define the tags and their allowed values. Adapt to your needs.
    tags_of_interest = {
        "amenity": ["bakery", "supermarket", "cafe", "restaurant", "fast_food", "pub", "bar", "ice_cream", "cinema","theatre"],
        "shop": ["convenience", "bakery", "hairdresser", "pharmacy", "drugstore", "florist", "gift", "clothes", "shoes", "mall","department_store"],
        "healthcare": ["hospital", "clinic", "dentist"],
        "leisure": ["park", "playground", "swimming_pool"],
        "historic": ["castle", "ruins"]
    }

    extracted_locations = extract_location_data(osm_file, tags_of_interest)

    if extracted_locations is not None:
        write_json_file(extracted_locations, output_json_file)