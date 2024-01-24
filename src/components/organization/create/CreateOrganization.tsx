import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateOrganization() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="createOrganization" className="flex gap-1 h-8 text-xs justify-start p-2"><PlusIcon />Create Organization</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="">Create Organization</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        This is your organization within [Sem nome]. For example, you can use the name of your company.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="w-full flex flex-col gap-10">
                        <div className="flex flex-col gap-3">
                            <Label className="text-accent-foreground" htmlFor="organizationName">Name</Label>
                            <Input placeholder="Name Organization" id="organizationName" type="text" className="w-full" />
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-3">
                                <Label className="text-accent-foreground">Type Organization</Label>
                                <Select>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Type Organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="educational">Educational</SelectItem>
                                            <SelectItem value="startup">Startup</SelectItem>
                                            <SelectItem value="company">Company</SelectItem>
                                            <SelectItem value="agency">Agency</SelectItem>
                                            <SelectItem value="n/a">N/A</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label className="text-accent-foreground">Plan Organization</Label>
                                <Select>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select Plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="free">Free 0R$ - Month</SelectItem>
                                            <SelectItem value="pro">Pro 35R$ - Month</SelectItem>
                                            <SelectItem value="team">Team 699R$ - Month</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    </div>
                </div>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button type="button" variant="primary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" variant="secondary">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}