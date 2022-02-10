import {CommandContext, CommandOptionType, SlashCreator} from "slash-create";
import LambdaSlashCommand from "../command";

export default class GalleryCommand extends LambdaSlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "gallery",
            description: "Creates an image gallery.",
            options: [
                {
                    //@ts-ignore
                    type: CommandOptionType.ATTACHMENT,
                    name: "image_1",
                    description: "File to be used as the top left image (or the left image if only 1-2 images are provided)",
                    require: true
                },
                {
                    //@ts-ignore
                    type: CommandOptionType.ATTACHMENT,
                    name: "image_2",
                    description: "File to be used as top left image (or the right image if only 1-2 images are provided)"
                },
                {
                    //@ts-ignore
                    type: CommandOptionType.ATTACHMENT,
                    name: "image_3",
                    description: "Attachment to be used as the bottom left image",
                },
                {
                    //@ts-ignore
                    type: CommandOptionType.ATTACHMENT,
                    name: "image_4",
                    description: "Attachment to be used as the bottom right image",
                },
            ],
        });

        this.filePath = __filename;
    }

    async run(ctx: CommandContext) {
        const images = [
            ctx.options.image_1,
            ctx.options.image_2,
            ctx.options.image_3,
            ctx.options.image_4
        ].filter(image => image);

        if (images.length == 0) {
            await ctx.send(`No valid inputs were provided`);
        }

        const urls = images.map(id => {
            return ctx.attachments.get(id)!.url;
        })

        await ctx.send({
            embeds: urls.map((img: string) => ({
                // Use the first image as a shared URL to force the gallery to appear
                url: urls[0],
                image: {
                    url: img
                }
            }))
        })
    }
}
