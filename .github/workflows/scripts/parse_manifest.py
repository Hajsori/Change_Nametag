import json

with open("/Change_Nametags/manifest.json") as f:
    manifest = json.load(f)

version = "."

version_array = [str(x) for x in manifest["header"]["min_engine_version"]]
version = version.join(version_array)


print(f"::set-output name=mc_version::{version}")
