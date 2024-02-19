import xml.etree.ElementTree as ET


def get_departments(xml_data: str) -> set[str]:
    departments: set[str] = set()
    root = ET.fromstring(xml_data)
    for record in root.findall(".//record"):
        department_elem = record.find("department")
        if department_elem is not None and department_elem.text:
            department = department_elem.text.strip()
            departments.add(department)
    return departments


# Read XML data from file
file_name = "companydue.xml"
with open(file_name, "r") as file:
    xml_data = file.read()

departments: set[str] = get_departments(xml_data)
print("Departments:")
for department in departments:
    print(department)
