import xml.etree.ElementTree as ET

# File path for the XML data
file_path = "/home/aries/Code/IPT/company-due/companydue.xml"

# Parse the XML
tree = ET.parse(file_path)
root = tree.getroot()

# Get all department elements
departments = root.findall(".//department")

# Extract department names as strings and store them in a set
department_names = {
    str(department_element.text.strip())
    for department_element in departments
    if department_element.text is not None
}

# Print each department name on a separate line
for i, department in enumerate(department_names, 1):
    print(f'<option value="{department.lower()}">{department}</option>')
