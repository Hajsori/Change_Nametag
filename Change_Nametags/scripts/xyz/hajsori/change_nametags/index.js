import * as Minecraft from "@minecraft/server"


Minecraft.system.beforeEvents.startup.subscribe((event) => {
    event.customCommandRegistry.registerEnum("nametag:parameters", ["set", "reset"])
    event.customCommandRegistry.registerCommand(
        {
            name: "nametag:nametag",
            description: "Change the Nametag from a Player",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            cheatsRequired: false,
            mandatoryParameters: [
                {
                    name: "nametag:parameters",
                    type: Minecraft.CustomCommandParamType.Enum
                },
                {
                    name: "player",
                    type: Minecraft.CustomCommandParamType.EntitySelector
                }
            ],
            optionalParameters: [
                {
                    name: "nametag",
                    type: Minecraft.CustomCommandParamType.String
                }
            ]
        },
        /**
         * 
         * @param {Minecraft.Entity[]} entities 
         */
        (origin, parameter, entities, nametag = "") => {
            Minecraft.system.run(() => {
                if (parameter === "set") {
                    for (const entity of entities) {
                        entity.nameTag = nametag.replaceAll("\\n", "\n").replaceAll("@s", entity.name ?? entity.typeId)
                    }

                    return {
                        message: `Setted nametag from §l${entities.map((entity) => entity.nameTag).join(", ")} §rto §l${nametag}`,
                        status: Minecraft.CustomCommandStatus.Success
                    }
                } else if (parameter === "reset") {
                    for (const entity of entities) {
                        entity.nameTag = ""
                    }

                    return {
                        message: `Resetted nametag from §l${entities.map((entity) => entity.nameTag).join(", ")}`,
                        status: Minecraft.CustomCommandStatus.Success
                    }
                }
            })
        }
    )

    console.info("[Change Nametag] Loaded Addon")
})
