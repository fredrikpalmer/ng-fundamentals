import { VoterService } from "./voter.service";
import { ISession } from "./event.model";
import { of } from "rxjs";

describe("VoterService", () => {
  let voterService!: VoterService;
  let mockHttp: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj("mockHttp", ["post", "delete"]);
    voterService = new VoterService(mockHttp);
  });

  describe("removeVoter", () => {
    it("should not throw", async () => {
      const session = <ISession>{
        id: 1,
        voters: ["johnpapa"],
      };

      mockHttp.delete.and.returnValue(of<any>());
      expect(
        async () =>
          await voterService.removeVote(1, session, "johnpapa").toPromise()
      ).not.toThrow();
    });

    it("should call api with correct url", async () => {
      const session = <ISession>{
        id: 1,
        voters: ["johnpapa"],
      };

      mockHttp.delete.and.returnValue(of<any>());
      await voterService.removeVote(1, session, "johnpapa").toPromise();

      expect(
        mockHttp.delete
      ).toHaveBeenCalledWith(
        "http://localhost:3000/api/events/1/sessions/1/voters",
        { params: { userName: "johnpapa" } }
      );
    });
  });
});
