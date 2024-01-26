import axios from "axios";
import { GetServerSidePropsContext } from "next";

/**
 *  Important:
 *  during SSR, we point axios to reach out to the ingress controller directly when we need to reach out to other services.
 *
 *  This is because we are already inside the cluster (past the ingress controller) during SSR.
 *  The nginx ingress controller has all the rules of path -> svc matching so we send requests there to make sure they
 *  get routed appropriately.
 *
 *  Other details:
 *  - Because the nginx controller is in a different namespace we use the svc.cluster.local dns to access it.
 *  - nginx uses the domain to know how to route the request, so need to include the 'Host' header
 *  - downstream services also need the cookies for auth, so we need to include cookies as well.
 *
 *  Basically, just include all headers from original req to act as a proxy essentially
 * @param context
 */
export const buildNginxClient = (context: GetServerSidePropsContext) => {
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: context.req.headers,
  });
};
